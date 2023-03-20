import bcrypt from 'bcryptjs';


const users = [
    {
        name:'Admin User',
        email:'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
    } ,
    {
        name:'playablefactory',
        email:'playablefactory@example.com',
        password:bcrypt.hashSync('123456', 10),
       
    } ,

    {
        name:'Nabi Ozer',
        email:'nabiozer@example.com',
        password:bcrypt.hashSync('123456', 10),
    } ,
];



export default users;