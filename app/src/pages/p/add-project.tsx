import { withAuth } from "@/authGuards/withAuth"
import { FormBlockFileInput } from "@/components/FormBlockFileInput"
import { FormBlockTextInput } from "@/components/FormBlockTextInput"
import { ProviderTopNavigation } from "@/components/ProviderTopNavigation"
import { ADD_PROJECT_FOR_PROVIDER_API, DASHBOARD } from "@/utils/config"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { ButtonView } from "./dash"



const AddProject = () => {

    const router=useRouter()
    return (
        <div className="px-4 mx-auto">
            <ProviderTopNavigation />

            <h1 className="text-2xl font-black mb-7">Add a new project to your profile</h1>
            <Formik initialValues={{image: '', short_desc: '' }} onSubmit={(e) => {
                const formData=new FormData()
                formData.append('image', e.image)
                formData.append('short_desc', e.short_desc)


                axios.post(ADD_PROJECT_FOR_PROVIDER_API, formData).then(e => {
                    toast.success('project added successfully')
                    router.push(DASHBOARD)
                }).catch(e => {
                    toast.error(e.message)
                })

            }}>
                <Form>
                    <FormBlockTextInput id="short_desc" label="Short Desc on the image" placeholder='' />
                    <FormBlockFileInput label="Select an image" id="image" />

                    <button type="submit" className="mt-5">
                        <ButtonView title="Add project" />
                    </button>
                </Form>



            </Formik>
        </div>
    )
}

export default withAuth(AddProject)
