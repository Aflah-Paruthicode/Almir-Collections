import { Link, useParams, useSearchParams } from "react-router-dom";
import useSearchProducts from "../services/useSearchProducts";
import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase-config";

const Header = (props) => {
  const { categoryName } = useParams();
  const [searchText, setSearchText] = useState("");
  const [queryS] = useSearchParams();
  const searchData = queryS.get("query");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const suggestionRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/adminLogin");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSearch = async (e) => {
    setIsOpen(true);
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() == "") {
      setResults([]);
      return;
    }

    const data = await useSearchProducts(value);
    console.log("the data : ", data);
    setResults(data);
  };

  useEffect(() => {
    if(categoryName) setSearchText(searchData)
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestionRef]);

  return (
    <div className="w-[1050px] mx-auto flex py-4 justify-between items-center max-sm:w-full max-sm:pr-3 relative">
      <Link to={"/"}>
        <img
          className="h-16 object-cover w-48 rounded-4xl invert max-sm:w-[8rem]"
          src="/logo.png"
          alt=""
        />
      </Link>
      <div className="flex justify-end gap-2 max-sm:w-[60%] max-sm:gap-1">
        <div className=" right-0">
          <input
            className="bg-[#141414] text-[#bababa] border
          border-[#bababa] py-3 px-5 w-[25rem] rounded-4xl z-[9999] max-sm:w-full max-sm:py-2  max-sm:px-3 max-sm:text-sm"
            placeholder="Search..."
            type="text"
            value={searchText == null ? '' : searchText}
            onChange={handleSearch}
            onClick={handleSearch}
          />
          {results.length > 0 && isOpen && (
            <ul
              ref={suggestionRef}
              className="z-10 absolute w-[25rem] bg-[#141414] rounded-2xl p-5 text-[#bababa] max-sm:w-[95vw] max-sm:left-2 max-sm:max-h-[61vh] max-sm:overflow-y-scroll"
            >
              {results.map((result, index) => {
                let trimmedName = result.name.slice(0, 35);
                return (
                  <Link
                    className="z-10"
                    key={index}
                    to={"/viewProduct/" + result.id}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setResults([]);
                    }}
                  >
                    <li className="p-1 z-10 hover:text-[#8c8c8c] rounded-2xl hover:bg-[#1f1f1f] max-sm:p-0">
                      <div className="flex justify-between">
                        <p className=" z-10 text-start my-auto max-sm:text-sm">
                          {result.name.length > 35
                            ? trimmedName + "..."
                            : result.name}
                        </p>
                        <img
                          className="w-10 z-10 h-10 object-cover rounded-lg"
                          src={result.images[0]}
                          alt=""
                        />
                      </div>
                    </li>
                    {index !== results.length - 1 && (
                      <hr className="bg-[#bababa] m-1 h-[0.5px] max-sm:h-[0.2px]" />
                    )}
                  </Link>
                );
              })}
            </ul>
          )}
        </div>
        <Link
          to={`/category/search?query=${searchText}`}
          onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          className="bg-[#141414] p-3 border border-[#bababa] rounded-[50%] max-sm:p-1.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26px"
            viewBox="0 -960 960 960"
            width="26px"
            fill="#bababa"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </Link>
        {props.isAdmin && (
          <button
            onClick={() => handleLogout()}
            className="bg-gradient-to-br m-auto ml-5 transition-colors from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[#bababa] font-semibold text-[16px] px-4 py-2 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] "
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
