
export const addAnimation = (ref, animation, timeout) => {

    ref.current.classList.add(animation);
  
    setTimeout(()=>{
      ref.current.classList.remove(animation)
    },timeout)

  
}