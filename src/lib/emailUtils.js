export const generateEmailVariations = (email) => {
    const [username, domain] = email.split('@');
    const variations = new Set();

    if (!username || !domain) return variations;

    variations.add(email); 
    
    const commonPlusAliases = ['Cipher', 'Ciphertech', 'Hackerpro', 'vybs', 'girlfriend', 'alerts', 'promos', 'forums', 'blog', 'shop', 'secure', 'backup', 'test', 'dev', 'admin', 'contact', 'squirt', 'info', 'me', 'Fuck', 'spam', 'junk', 'personal', 'wet'];
    commonPlusAliases.forEach(alias => {
        if (variations.size < 250) variations.add(`${username}+${alias}@${domain}`);
    });
    
    for (let i = 0; i < username.length -1; i++) {
        const dottedUsername = username.slice(0, i + 1) + '.' + username.slice(i + 1);
        if (variations.size < 250) variations.add(`${dottedUsername}@${domain}`);
        else break;

        if (variations.size < 250 && i < username.length - 2) {
            const doubleDotted = dottedUsername.slice(0, i + 3) + '.' + dottedUsername.slice(i + 3);
            variations.add(`${doubleDotted}@${domain}`);
        }
    }
    
    const commonSuffixes = ['01', '007', '123', '2024', '2025', 'app', 'pro', 'service', 'online', 'my', 'site', 'web', 'mail', 'user', 'id', 'account', 'profile'];
    commonSuffixes.forEach(suffix => {
        if (variations.size < 250) variations.add(`${username}+${suffix}@${domain}`);
        if (variations.size < 250) variations.add(`${username}.${suffix}@${domain}`);
    });

    for (let i = 0; i < username.length; i++) {
        if (variations.size >= 250) break;
        let char = username[i];
        if (char >= 'a' && char <= 'z') {
            variations.add(`${username.substring(0,i)}${char.toUpperCase()}${username.substring(i+1)}@${domain}`);
        }
    }
    
    let counter = 1;
    while (variations.size < 205 && counter < 300) { 
        variations.add(`${username}+random${counter}@${domain}`);
        if (username.length > 3 && variations.size < 205) {
            variations.add(`${username.substring(0,3)}${counter}@${domain}`);
            variations.add(`${username.substring(0,Math.min(username.length, 4))}.${counter}x@${domain}`);
        }
        if (variations.size < 205) {
            variations.add(`${username}.${counter}@${domain}`);
        }
        if (variations.size < 205 && username.length > 1) {
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
