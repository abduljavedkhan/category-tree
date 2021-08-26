import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <Header />
                {children}
            <Footer />
        </div>
    );
};

export default MainLayout;
