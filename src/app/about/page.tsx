import CreditCard from "@/components/creditCard";

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-blue-600 mb-6">
                 About page
            </p>

            <div className="card-stack grid grid-col">
                <CreditCard cardNumber={"1234 5678 9012 3456"} name="John Doe" expiration="12/25" card="1"/>
                <CreditCard cardNumber={"9876 5432 1098 7654"} name="John Doe" expiration="11/26" card="2"/>
                <CreditCard cardNumber={"4567 8901 2345 6789"} name="John Doe" expiration="10/24" card="3"/>
  
</div>



           
        </div>
    )
}