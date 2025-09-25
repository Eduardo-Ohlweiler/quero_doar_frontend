import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import LastDonationPreview from "../components/LastDonationPreview/LastDonationPreview";
import TopCategory from "../components/TopCategory/TopCategory";
import HallOfFame from "../components/HallOfFame/HallOfFame";
import Button from "../components/Button/Button";
import { FaHandsHoldingCircle, FaPlus } from 'react-icons/fa6';
import donationService from "../services/donation/donationService";
import categoryService from "../services/category/categoryService";
import userService from "../services/user/userService";

export default function Home (){

    const [lastDonations, setLastDonations] = useState(null);
    const [categories, setCategories] = useState([]);
    const [topUsers, setTopUsers] = useState([]);

    const fetchTopUsers = async () => {
        try {
            const users = await userService.GetHallOfFame(3);
            setTopUsers(users);
        } catch (error) {
            console.error("Error fetching top users:", error);
        }
    };

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
        fetchTopUsers();
    }, []);

    return (
        <>
            <div className="absolute w-full bg-gradient-primary pt-25 h-220">
                <div className="flex flex-col items-center justify-center text-white text-center p-4">
                    <span 
                        className="text-4xl font-bold hover:cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => console.log("Clicked on 'doação' word")}
                    >
                        
                        Transforme vidas através da <span style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", color: "var(--color-highlight)"}}>doação</span>
                    </span>
                    <span className="mt-4 text-base font-medium max-w-xl text-gray-200">
                        Conectamos pessoas que querem doar com quem precisa. Juntos, construímos uma comunidade mais solidária.
                    </span>
                    <div className="flex gap-4 mt-6">
                        <Button className="flex items-center gap-x-2" appearance="secondary"><FaPlus />Fazer uma doação</Button>
                        <Button className="flex items-center gap-x-2" appearance="secondary"><FaHandsHoldingCircle /> Pedir uma doação</Button>
                    </div>
                </div>
                <div id="gradient-overlay" className="absolute bottom-0 left-0 w-full h-120 bg-gradient-to-t from-slate-100 to-transparent"></div>
            </div>
            <div className="bg-slate-100 p-16 space-y-16 mt-80">
                <HallOfFame
                    topUsers={topUsers}
                    onUserClick={(userId) => console.log("Clicked user:", userId)}
                />
                <div className="max-w-screen-xl mx-auto">
                    <LastDonationPreview
                        data={lastDonations}
                        itemsPerPage={6}
                        onDonationClick={(donationId) => console.log("Clicked donation:", donationId)}
                        onDonationActionClick={(donationId) => console.log("Action clicked for donation:", donationId)}
                        onLoadMore={() => console.log("Load more donations")}
                        onNavigateToAllDonations={() => console.log("Navigate to all donations")}
                    />
                </div>
                <TopCategory
                    categories={categories}
                    onCategoryClick={(category) => console.log("Clicked category:", category)}
                    // className="mt-16"
                />
            </div>
        </>
        
    )
}