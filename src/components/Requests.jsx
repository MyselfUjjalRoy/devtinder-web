import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <h1 className="text-slate-600 font-mono tracking-widest uppercase italic">
          No Request Found
        </h1>
      </div>
    );

  return (
    <div
      className="min-h-screen py-20 px-4"
      style={{
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(at 50% 0%, hsla(225,39%,30%,0.1) 0, transparent 50%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Requests
          </h1>
          <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {requests.length} PENDING
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {requests.map((request) => {
            const { firstName, lastName, photoUrl, about } = request.fromUserId;
            return (
              <div
                key={request._id}
                className="group relative flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <img
                      src={photoUrl}
                      className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg"
                      alt="profile"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#050505] rounded-full"></div>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-white leading-tight">
                      {firstName}{" "}
                      <span className="text-slate-400 font-medium">
                        {lastName}
                      </span>
                    </h2>
                    <p className="text-slate-500 text-xs line-clamp-1 italic font-light max-w-md">
                      {about || "Wants to connect with you"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-6 py-2 rounded-xl bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider border border-red-500/20 transition-all hover:bg-red-500 hover:text-white active:scale-95"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>

                <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
