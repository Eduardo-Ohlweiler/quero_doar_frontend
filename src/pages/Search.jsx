import SearchFilter from "../components/SearchFilter/SearchFilter";
import SearchPreview from "../components/SearchPreview/SearchPreview";
import { useState } from "react";

export default function Search() {

    const [donationFilter, setDonationFilter] = useState({
        donationTypes: ["giver", "receiver"], // "giver", "receiver"
        accessTypes: [],
        selectedStates: [],
        selectedCities: [],
        selectedCategories: [],
        selectedDistance: 'any',
        itemStates: []
    });

    return (
        // <section className="min-h-screen pt-20 bg-gray-100">
        <section className="min-h-screen p-2 pt-16 bg-gradient-primary flex flex-row gap-2">
            <SearchFilter
                donationTypes={donationFilter.donationTypes}
                onDonationTypesChange={(value) => setDonationFilter(prev => ({...prev, donationTypes: value}))}
            />
            <SearchPreview />
        </section>
    )

}