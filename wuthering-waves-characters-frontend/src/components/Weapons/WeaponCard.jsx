import { Link } from "react-router-dom";
import Image from "../UI/Image";
import { motion } from "framer-motion";

export default function WeaponCard({ weapon, delay }) {
  const weaponIcon = "https://via.placeholder.com/200"; // `https://api.resonance.rest/weapons/${weapon}/icon`;

  return (
    <motion.div
      className="bg-secondary rounded-lg shadow-md p-8 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "tween",
        stiffness: 100,
        delay: delay,
      }}
    >
      <h1>{weapon}</h1>
      <Image
        src={weaponIcon}
        alt={weapon + " icon"}
        width={200}
        height={200}
        className="m-4 rounded-full"
      />
      <Link to={`/weapons/${weapon}`} className="btn btn-primary mt-2">
        View Weapons
      </Link>
    </motion.div>
  );
}
