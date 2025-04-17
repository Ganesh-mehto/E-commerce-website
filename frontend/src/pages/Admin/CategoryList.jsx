import { useState } from "react"
import { toast } from "react-toastify"
import { useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,} from '../../redux/api/categoryApiSlice'
import CategoryForm from "../../components/CategoryForm"
import Modal from "../../components/Modal"


const CategoryList = () => {
  const {data:categories}=useFetchCategoriesQuery()
  const [name,setName]=useState('')
  const [selectedCategory,setSelectedCategory]=useState(null)
  const [updatingName,setUpdatingName]=useState('')
  const [modalVisible,setModalVisible]=useState(false)
  const [createCategory]=useCreateCategoryMutation()
  const [updateCategory]=useUpdateCategoryMutation()
  const [deleteCategory]=useDeleteCategoryMutation()
  const handleCreateCategory =async(e)=>{
    e.preventDefault()
    if (!name) {
      toast.error('category name is requried')
    }
    try {
      const result =await createCategory({name}).unwrap()
      if (result.error) {
        toast.error(result.error)
      }else{
        setName('')
        toast.success(`${result.name} is created`)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('creating category failed')
    }
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category delection failed. Tray again.");
    }
  };
  
  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <div className="h-12">
          Manage Categories
        </div>
        <CategoryForm value={name} setValue={setName }handleSubmit={handleCreateCategory}/>
        <br/>
        <hr/>
        <div className="flex flex-wrap">
          {categories?.map((category)=>(
            <div key={category._id}>
              <button className="bg-white border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"onClick={()=>{
                setModalVisible(true)
                setSelectedCategory(category)
                setUpdatingName(category.name)
              }}>{category.name}</button>
              </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={()=>setModalVisible(false)}>
          <CategoryForm value={updatingName} setValue={value=>setUpdatingName(value)} handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}/>
        </Modal>
      </div>
    </div>
  )
}

export default CategoryList
