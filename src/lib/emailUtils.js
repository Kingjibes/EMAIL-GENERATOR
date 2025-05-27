
export const generateEmailVariations = (email) => {
    const [username, domain] = email.split('@');
    const variations = new Set();

    if (!username || !domain) return variations;

    variations.add(email); 
    
    const commonDotAliases = ['alias1', 'newsletter', 'social', 'work', 'projectx', 'alerts', 'promos', 'forums', 'blog', 'shop', 'secure', 'backup', 'test', 'dev', 'admin', 'contact', 'support', 'info', 'me', 'updates', 'spam', 'junk', 'personal', 'business'];
    commonDotAliases.forEach(alias => {
        if (variations.size < 250) variations.add(`${username}.${alias}@${domain}`);
    });
    
    // Generate variations by inserting dots into the username
    // This was the original dot logic, keep it for variety if username doesn't have dots
    if (!username.includes('.')) {
        for (let i = 0; i < username.length - 1; i++) {
            const dottedUsername = username.slice(0, i + 1) + '.' + username.slice(i + 1);
            if (variations.size < 250) variations.add(`${dottedUsername}@${domain}`);
            else break;

            // Potentially add a second dot if the username is long enough
            if (variations.size < 250 && i < username.length - 3) { // ensure space for at least one char after 2nd dot
                const usernamePart2 = dottedUsername.slice(i + 2); // part after the first dot
                if (usernamePart2.length > 1) {
                    for (let j = 0; j < usernamePart2.length -1; j++) {
                         if (variations.size >= 250) break;
                         const doubleDotted = username.slice(0, i + 1) + '.' + usernamePart2.slice(0, j + 1) + '.' + usernamePart2.slice(j + 1);
                         variations.add(`${doubleDotted}@${domain}`);
                    }
                }
            }
        }
    }
    
    const commonSuffixes = ['01', '007', '123', '2024', '2025', 'app', 'pro', 'service', 'online', 'my', 'site', 'web', 'mail', 'user', 'id', 'account', 'profile'];
    commonSuffixes.forEach(suffix => {
        if (variations.size < 250) variations.add(`${username}.${suffix}@${domain}`);
    });

    // Gmail ignores case, so this doesn't create new distinct mailboxes, but can be used for filtering/tracking
    for (let i = 0; i < username.length; i++) {
        if (variations.size >= 250) break;
        let char = username[i];
        if (char >= 'a' && char <= 'z') {
            variations.add(`${username.substring(0,i)}${char.toUpperCase()}${username.substring(i+1)}@${domain}`);
        }
    }
    
    let counter = 1;
    while (variations.size < 205 && counter < 300) { 
        variations.add(`${username}.random${counter}@${domain}`);
        if (username.length > 3 && variations.size < 205) {
            variations.add(`${username.substring(0,3)}${counter}@${domain}`); // This might not be a dot alias, but was in original logic
            variations.add(`${username.substring(0,Math.min(username.length, 4))}.${counter}x@${domain}`);
        }
        if (variations.size < 205) {
            variations.add(`${username}.${counter}@${domain}`);
        }
        if (variations.size < 205 && username.length > 1) {
             // This creates something like user_n1@domain.com, not strictly dot alias, keep for variety from original
             variations.add(`${username.slice(0, -1)}_${username.slice(-1)}${counter}@${domain}`);
        }
        counter++;
    }

    let prefixCounter = 1;
    const prefixes = ['the', 'my', 'user', 'mail'];
    for (const prefix of prefixes) {
        if (variations.size >= 250) break;
        variations.add(`${prefix}.${username}${prefixCounter++}@${domain}`);
    }
    
    return variations;
  };
