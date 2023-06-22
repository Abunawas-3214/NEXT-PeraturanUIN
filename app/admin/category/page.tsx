import TopbarAdmin from '@/components/TopbarAdmin'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

const getCategories = async () => {
    const res = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
        }
    })
    return res
}

const Category = async () => {
    const categories = await getCategories()
    return (
        <div>
            <TopbarAdmin menuTitle={'Data Kategori'} />
            <div className='my-2'>

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
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Category