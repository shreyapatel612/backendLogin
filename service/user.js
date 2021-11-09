class UserService {
    async register(name,email){
        const { name , email } = this.sanitizedNames( name , email);
        console.log(`name = ${name}`);
        console.log(`email = ${email}`);

        return 5;
    }

    sanitizedNames( name , email){
        let [ sanitizedName, ... Email] = name.trim().split(' ');
        if(email){
            Email = Email.concat(email.split(' '));
        }

        const eMail = Email.filter((n) => n);

        const sanitizedEmail = eMail.length
            ? eMail.join(' ')
            :null ;
        
        return {
            name : sanitizedName,
            email : sanitizedEmail,
        };
    }
}