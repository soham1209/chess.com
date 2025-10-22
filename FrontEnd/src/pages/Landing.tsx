import Button from "../componets/Button";
import { useNavigate } from "react-router";

function Landing() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-8">
      <div className="max-w-6xl w-full flex items-center gap-12">
        {/* Left Side - Image */}
        <div className="flex-1">
          <img
            src="./chess.png"
            alt="Chess Board"
            className="w-full rounded-lg shadow-2xl"
          />
        </div>

        {/* Right Side - Heading and Button */}
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="text-6xl font-bold text-white">
            Play Chess Online
          </h1>
          <p className="text-xl text-gray-300">
            Challenge players from around the world in real-time chess matches
          </p>
          <div>
            <Button onClick={()=>navigate('/game') } children="New Game"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;


