import bgImage from "../assets/bg.png";
import cardImage from "../assets/card.png";
import eclipse from "../assets/eclipse.png";
import logo from "../assets/logo.svg";

const LeftArea = () => {
  return (
    <div className="hidden md:block flex-1 p-6">
      <div
        className="relative w-full h-full overflow-hidden rounded-3xl bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(1, 8, 96, 0.4) 0%, rgba(0, 34, 131, 0.4) 19.23%, rgba(115, 74, 163, 0.4) 38.46%, rgba(231, 149, 156, 0.4) 57.21%, rgba(228, 161, 130, 0.4) 76%, rgba(191, 54, 19, 0.1) 100%), url(${bgImage})`,
        }}
      >
        {/* logo */}
        <div className="absolute left-6 top-6 z-10 flex items-center gap-2">
          <span className="text-3xl font-black text-blue-900">Productr</span>
          <img src={logo} alt="logo" />
        </div>

        {/* center card  */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-72 h-96 rounded-3xl overflow-hidden shadow-2xl">
            {/* runnig boy img */}
            <img src={cardImage} alt="cardImg" className="w-full h-full object-cover" />

            {/* eclipse*/}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[100px] ">
              <img src={eclipse} alt="eclipse" className="" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <p className="text-xl font-semibold text-white">Uplist your</p>
              <p className="text-xl font-semibold text-white">
                product to market
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftArea;
