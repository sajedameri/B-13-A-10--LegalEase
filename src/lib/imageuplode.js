export const imageUpload = async (image)=>{
  const formData = new FormData();
  formData.append('image',image);
  const res = await fetch(`https://api.imgbb.com/1/upload?key = ${process.env.NEXT_PUBLIC_IMAGE_BB_LINK_KEY}`,{
    method:"POST",
    body:image
  });
  const data = await res.json();
  return data.data;
  console.log(data)


}