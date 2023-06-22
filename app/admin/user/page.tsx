import { PrismaClient } from '@prisma/client'
import AddUser from './addUser'
import DeleteUser from './deleteUser'
import UpdateUser from './updateUser'
import TopbarAdmin from '@/components/TopbarAdmin'

const prisma = new PrismaClient()

const getUsers = async () => {
    const res = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
            author: true
        }
    })
    return res
}

const User = async () => {
    const users = await getUsers()
    return (
        <div>
            <TopbarAdmin menuTitle={'Data User'} />
            <div className='my-2'>
                <AddUser />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Author</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <input type="checkbox" className='checkbox checkbox-success' disabled checked={user.author} />
                            </td>
                            <td className='flex justify-center space-x-1'>
                                <UpdateUser user={user} />
                                <DeleteUser user={user} />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default User