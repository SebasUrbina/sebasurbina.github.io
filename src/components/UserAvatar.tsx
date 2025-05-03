import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

type Props = {
  size?: number; // en píxeles
};

const UserAvatar = ({ size = 36 }: Props) => {
  const navigate = useNavigate();

  return (
    <Avatar style={{ width: size, height: size }}>
      <AvatarImage
        src="https://avatars.githubusercontent.com/u/48739508"
        alt="SebaUr Profile Image"
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => navigate("/")}
        role="button"
      />
      <AvatarFallback>SU</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
