import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import LastDonationPreview from "../components/LastDonationPreview/LastDonationPreview";
import donationService from "../services/donation/donationService";

export default function Home (){

    const [lastDonations, setLastDonations] = useState(null);

    const fetchLastDonations = async () => {
        try {
            const data = await donationService.GetLastDonationPreview();
            setLastDonations(data);
        } catch (error) {
            console.error("Error fetching last donations:", error);
        }
    };

    useEffect(() => {
        fetchLastDonations();
    }, []);

    return (
        <div className="bg-gradient-primary h-1000 p-4">
            <div className="h-20"/>
            <LastDonationPreview
                data={lastDonations}
                itemsPerPage={6}
                onDonationClick={(donationId) => console.log("Clicked donation:", donationId)}
                onDonationActionClick={(donationId) => console.log("Action clicked for donation:", donationId)}
                onLoadMore={() => console.log("Load more donations")}
            />
        </div>
    )
}