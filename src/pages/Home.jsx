import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import LastDonationPreview from "../components/LastDonationPreview/LastDonationPreview";
import TopCategory from "../components/TopCategory/TopCategory";
import donationService from "../services/donation/donationService";
import categoryService from "../services/category/categoryService";

export default function Home (){

    const [lastDonations, setLastDonations] = useState(null);
    const [categories, setCategories] = useState([]);

    const fetchLastDonations = async () => {
        try {
            const data = await donationService.GetLastDonationPreview();
            setLastDonations(data);
        } catch (error) {
            console.error("Error fetching last donations:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const categories = await categoryService.GetCategoriesWithDonationAvailable();
            setCategories(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }   
    };

    useEffect(() => {
        fetchLastDonations();
        fetchCategories();
    }, []);

    return (
        <div className="bg-slate-100 p-16 space-y-16">
            <LastDonationPreview
                data={lastDonations}
                itemsPerPage={6}
                onDonationClick={(donationId) => console.log("Clicked donation:", donationId)}
                onDonationActionClick={(donationId) => console.log("Action clicked for donation:", donationId)}
                onLoadMore={() => console.log("Load more donations")}
            />
            <TopCategory
                categories={categories}
                onCategoryClick={(category) => console.log("Clicked category:", category)}
                // className="mt-16"
            />
        </div>
    )
}