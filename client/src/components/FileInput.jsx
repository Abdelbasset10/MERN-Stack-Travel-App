import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase";
import check from "../assets/check.png";

const FileInput = ({ name, label, value, type, handleInputState, ...rest }) => {
	const inputRef = useRef();
	const [progress, setProgress] = useState(0);
	const [progressShow, setProgressShow] = useState(false);

	const handleUpload = () => {
		setProgressShow(true);
		const fileName = new Date().getTime() + value.name;
		const storageRef = ref(
			storage,
			type === "image" ? `/images/${fileName}` : `/audio/${fileName}`
		);
		const uploadTask = uploadBytesResumable(storageRef, value);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploaded = Math.floor(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(uploaded);
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					handleInputState(name, url);
				});
			}
		);
	};

	return (
		<div className='flex items-center justify-between w-full'>
			<input
				type="file"
				ref={inputRef}
				onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
				vlaue={value}
				
				{...rest}
                
			/>
			<button
				type="button"
				onClick={() => inputRef.current.click()}
				
			>
				{label}
			</button>
			{type === "image" && value && (
				<img
					src={typeof value === "string" ? value : URL.createObjectURL(value)}
					alt="file"
					className='w-[3rem] h-[3rem]'
				/>
			)}
			
			{value !== null && !progressShow && typeof value !== "string" && (
				<button onClick={handleUpload} className='w-[5rem] h-[40px] cursor-pointer'>
					Upload
				</button>
			)}
			{progressShow && progress < 100 && (
				<div>
					<p>{progress}%</p>
				</div>
			)}
			{progress === 100 && (
				<div>
					<img src={check} alt="check circle" className="w-[3rem] h-[3rem] rounded-[50%] " />
				</div>
			)}
		</div>
	);
};

export default FileInput;