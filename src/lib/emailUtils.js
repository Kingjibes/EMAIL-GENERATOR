export const generateEmailVariations = (email) => {
    const [username, domain] = email.split('@');
    const variations = new Set();

    if (!username || !domain) return variations;

    variations.add(email); 
    variations.add(`${username}+alias1@${domain}`);
    variations.add(`${username}+newsletter@${domain}`);
    variations.add(`${username}+social@${domain}`);
    variations.add(`${username}+work@${domain}`);
    variations.add(`${username}+projectx@${domain}`);
    
    for (let i = 0; i < username.length - 1; i++) {
        const dottedUsername = username.slice(0, i + 1) + '.' + username.slice(i + 1);
        if (variations.size < 150) variations.add(`${dottedUsername}@${domain}`);
        else break;
    }
    
    const commonSuffixes = ['01', '123', 'app', 'dev', 'pro', 'me', 'contact', 'support', 'admin', 'info', 'news', 'updates', 'alerts', 'forums', 'blog', 'shop', 'secure'];
    commonSuffixes.forEach(suffix => {
        if (variations.size < 150) variations.add(`${username}+${suffix}@${domain}`);
    });

    let counter = 1;
    while (variations.size < 105 && counter < 200) { 
        variations.add(`${username}+random${counter}@${domain}`);
        if (username.length > 3 && variations.size < 105) {
            variations.add(`${username.substring(0,3)}${counter}@${domain}`);
        }
        if (variations.size < 105) {
            variations.add(`${username}.${counter}@${domain}`);
        }
        counter++;
    }
    return variations;
  };