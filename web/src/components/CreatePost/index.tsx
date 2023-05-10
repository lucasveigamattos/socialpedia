import {EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined} from "@mui/icons-material"
import {Divider, Typography, InputBase, Button, IconButton, useTheme, useMediaQuery} from "@mui/material"
import {useDropzone} from "react-dropzone"
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import {setPost, setPosts} from "../../pages/state"
import UserImage from "../UserImage"

import {CustomThemeInterface} from "../../theme"

interface CreatePostPros {
    picturePath: string
}

function CreatePost(props: CreatePostPros) {
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(undefined)
    const [postDescription, setPostDescription] = useState("")
    
    const dispatch = useDispatch()
    const {id} = useSelector((state: any) => state.user)
    const token = useSelector((state: any) => state.token)

    const theme: CustomThemeInterface = useTheme()
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

    async function handlePost() {
        const formData = new FormData()
        formData.append("userId", id)
        formData.append("description", postDescription)

        if (image) {
            formData.append("picture", image)
            formData.append("picturePath", image["name"])
        }

        const response = await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        const data = await response.json()

        dispatch(setPosts({data}))
        setImage(undefined)
        setPostDescription("")
    }
    
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            "image/jpg": [],
            "image/jpeg": [],
            "image/png": []
        },
        onDrop(acceptedFiles: any) {
            setImage(acceptedFiles[0])
        }
    })

    return (
        <div className="rounded-[1.2rem] pt-[2.4rem] px-[2.4rem] pb-[1.2rem]" style={{backgroundColor: theme.pallete.background.alternative}}>
            <div className="flex justify-between items-center gap-[2.4rem]">
                <UserImage image={props.picturePath}/>
                <InputBase placeholder="What's on your mind..." onChange={(event) => setPostDescription(event.target.value)} value={postDescription} sx={{width: "100%", borderRadius: "3.2rem", padding: "1.6rem 3.2rem", backgroundColor: theme.pallete.neutral.light}}/>
            </div>
            {isImage && (
                <div className="mt-[1.6rem] border rounded-[0.5rem] p-[1.6rem]" style={{borderColor: theme.pallete.neutral.medium}}>
                    <div className="flex justify-between items-center">
                        <div {...getRootProps()} className="w-full p-[1.6rem] cursor-pointer" style={{border: `0.2rem dashed ${theme.pallete.primary.main}`}}>
                            <input {...getInputProps()}/>
                            {!image ? (
                                <p>Add picture here</p>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <Typography>{image["name"]}</Typography>
                                    <EditOutlined/>
                                </div>
                            )}
                        </div>
                        {image && (
                            <IconButton onClick={() => setImage(undefined)} sx={{width: "15%"}}>
                                <DeleteOutlined/>
                            </IconButton>
                        )}
                    </div>
                </div>
            )}

            <Divider sx={{margin: "2rem 0"}}/>

            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-[0.4rem]" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{color: theme.pallete.neutral.mediumMain, cursor: "pointer"}}/>
                    <Typography color={theme.pallete.neutral.mediumMain} sx={{cursor: "pointer"}}>Image</Typography>
                </div>
                {isNonMobileScreen ? (
                    <>
                        <div className="flex justify-between items-center gap-[0.4rem]">
                            <GifBoxOutlined sx={{color: theme.pallete.neutral.mediumMain}}/>
                            <Typography color={theme.pallete.neutral.mediumMain} sx={{cursor: "pointer"}}>Clip</Typography>
                        </div>

                        <div className="flex justify-between items-center gap-[0.4rem]">
                            <AttachFileOutlined sx={{color: theme.pallete.neutral.mediumMain}}/>
                            <Typography color={theme.pallete.neutral.mediumMain} sx={{cursor: "pointer"}}>Attachment</Typography>
                        </div>

                        <div className="flex justify-between items-center gap-[0.4rem]">
                            <MicOutlined sx={{color: theme.pallete.neutral.mediumMain}}/>
                            <Typography color={theme.pallete.neutral.mediumMain} sx={{cursor: "pointer"}}>Audio</Typography>
                        </div>
                    </>
                ) : <div className="flex justify-between items-center gap-[0.4rem]">
                        <MoreHorizOutlined sx={{color: theme.pallete.neutral.mediumMain}}/>
                    </div>}
               <Button disabled={!postDescription} onClick={handlePost} sx={{color: theme.pallete.background.alternative, backgroundColor: theme.pallete.primary.main, borderRadius: "4.8rem"}}>POST</Button>
            </div>
        </div>
    )
}

export default CreatePost