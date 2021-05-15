import Loader from "react-loader";

export const CustomLoader = ({ loading }) => {
  return <Loader
    loaded={!loading}
    length={20}
    width={10}
    radius={30}
    color="#d0808e"
    speed={1}
    trail={60}
    zIndex={2e9}
  />
}