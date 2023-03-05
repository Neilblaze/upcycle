import { withAuth } from "@/authGuards/withAuth"
import { FormBlockFileInput } from "@/components/FormBlockFileInput"
import { FormBlockMultiSelect } from "@/components/FormBlockMultiSelect"
import { FormBlockTextInput } from "@/components/FormBlockTextInput"
import { ProviderTopNavigation } from "@/components/ProviderTopNavigation"
import { ADD_PROJECT_FOR_PROVIDER_API, DASHBOARD, MY_LISTING_FOR_PROVIDER_API, UPDATE_PROFILE_FOR_PROVIDER_API } from "@/utils/config"
import axios, { AxiosError } from "axios"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Listings_MyListing_ApiResponse } from "../api/listings/my-listing"
import { ButtonView } from "./dash"


export const getErrorStringFromAxiosErr = (e: AxiosError) => {
    const tmp = (e.response?.data as any)
    return tmp?.error ? tmp?.error : (tmp?.message ? tmp?.message : e.message);
}

const categories =
    [
        `Alterations and repairs`,
        `Bespoke tailoring`,
        `Bridal wear`,
        `Men's suits`,
        `Women's suits`,
        `Dressmaking`,
        `Embroidery and embellishments`,
        `Leatherwork`,
        `Couture and high-end fashion`,
        `Pattern-making and grading`,
        `Upholstery and soft furnishings`,
        `Casual wear`,
        `Formal wear`,
        `Party wear`,
        `Beachwear`,
        `Maternity wear`,
        `Activewear`,
        `Outdoor wear`,
        `Plus size clothing`,
        `Vintage and retro clothing`,
        `Children's clothing`,
        `Ethnic and cultural clothing`,
        `Accessories such as bags, shoes, and jewelry.`,
    ]

const UpdateProfile = () => {

    const router = useRouter()

    const [listing, setListing] = useState<Listings_MyListing_ApiResponse>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios
            .get(MY_LISTING_FOR_PROVIDER_API)
            .then((e) => {
                setListing(e.data.listing)
                setIsLoading(false)
            })
            .catch((err) => {
                toast.error(getErrorStringFromAxiosErr(err))
                setIsLoading(false)
            })
    }, [])


    return (
        <div className="px-4 mx-auto">
            <ProviderTopNavigation />

            <h1 className="text-2xl font-black mb-7">Update public profile</h1>


            {isLoading && <div className="text-sm text-gray-600">Loading the listing details...</div>}

            {(!isLoading && listing) && <>

                <Formik initialValues={{...listing, image: ''}} onSubmit={(e) => {
                    const formData = new FormData()
                    if(e.image) formData.append('image', e.image)
                    formData.append('listing_name', e.listing_name)
                    formData.append('address', e.address)
                    formData.append('categories', e.categories.join('%%~~%%'))

                    axios.post(UPDATE_PROFILE_FOR_PROVIDER_API, formData).then(e => {
                        toast.success('project added successfully')
                        router.push(DASHBOARD)
                    }).catch(e => {
                        toast.error(getErrorStringFromAxiosErr(e))
                    })

                }}>
                    <Form>
                        <FormBlockTextInput id="listing_name" label="Store Name" placeholder='' />

                        <FormBlockTextInput as='textarea' id="address" label="Address" placeholder='' />

                        <FormBlockFileInput required={false} label="Storefront banner image" id="image" />

                        <FormBlockMultiSelect id='categories' label="Tags" options={categories.map(e => ({ value: e, label: e }))} />


                        <button type="submit" className="mt-5">
                            <ButtonView title="Update store profile" />
                        </button>
                    </Form>



                </Formik>
            </>}
        </div>
    )
}

export default withAuth(UpdateProfile)
