import {Box} from "@mui/material"

interface UserImageProps {
    image: string
}

function UserImage(Props: UserImageProps) {
    return (
        <Box width="6rem" height="6rem">
            <img src={`http://localhost:3000/assets/${Props.image}`} className="w-[6rem] h-[6rem] object-cover rounded-[50%]" alt="user picture"/>
        </Box>
    )
}

export default UserImage