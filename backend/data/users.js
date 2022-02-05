import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true,
        avatar: 'https://i.pravatar.cc/300?img=4',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('xxxx', 10),
        avatar: 'https://i.pravatar.cc/300?img=2',
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('xxxx', 10),
        avatar: 'https://i.pravatar.cc/300?img=1',
    }
]

export default users;