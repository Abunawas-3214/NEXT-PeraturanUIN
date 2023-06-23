import TopbarAdmin from '@/components/TopbarAdmin'
import { PrismaClient } from '@prisma/client'
import AddCategory from './addCategory'
import DeleteCategory from './deleteCategory'
import UpdateCategory from './updateCategory'

const prisma = new PrismaClient

const getCategories = async () => {
    return await prisma.category.findMany()
}

const Category = async () => {
    const categories = await getCategories()
    return (
        <div>
            <TopbarAdmin menuTitle={'Data Kategori'} />
            <div className='my-2'>
                <AddCategory />
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Kategori</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td className='flex justify-center space-x-1'>
                                <UpdateCategory category={category} />
                                <DeleteCategory category={category} />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Category