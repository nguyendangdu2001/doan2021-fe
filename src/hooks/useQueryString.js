const useQueryString = () => {
  return new URLSearchParams(window.location.search);
};
export default useQueryString;
