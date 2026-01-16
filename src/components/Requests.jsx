import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

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
        <h1 className="text-slate-500 font-mono tracking-widest uppercase italic">
          No Pending Signals
        </h1>
      </div>
    );

  return (
    <div
      className="min-h-screen py-20 px-4"
      style={{
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(at 100% 100%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 0% 0%, hsla(225,39%,30%,0.15) 0, transparent 50%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-24 flex flex-col items-center">
          <h1 className="text-8xl font-black tracking-tighter text-white opacity-90 mix-blend-difference">
            Requests
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {requests.map((request) => {
            const { firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;
            return (
              <div key={request._id} className="group relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-transparent rounded-[4rem] blur-3xl group-hover:from-emerald-500/20 transition-all duration-700"></div>

                <div className="relative flex flex-col bg-white/[0.02] border border-white/[0.05] rounded-[3rem] p-10 transition-all duration-500 hover:bg-white/[0.03] hover:border-white/10 hover:-translate-y-2 shadow-2xl overflow-hidden">
                  <div className="flex justify-between items-start mb-10">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img
                        src={photoUrl}
                        className="relative w-32 h-32 rounded-[2.5rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                        alt="profile"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-white/10 font-mono italic group-hover:text-emerald-500/20 transition-colors">
                        #{age}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                        {gender}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10">
                    <h2 className="text-4xl font-black text-white leading-none tracking-tight">
                      {firstName} <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                        {lastName}
                      </span>
                    </h2>
                    <div className="h-[1px] w-12 bg-emerald-500 group-hover:w-full transition-all duration-700 opacity-50"></div>
                    <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-3 italic">
                      "{about}"
                    </p>
                  </div>

                  {/* MODERN ACTION BUTTONS */}
                  <div className="flex gap-4 relative z-10">
                    <button className="flex-1 py-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 font-bold uppercase tracking-widest text-[10px] transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] active:scale-95">
                      Reject
                    </button>
                    <button className="flex-1 py-4 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold uppercase tracking-widest text-[10px] transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95">
                      Accept
                    </button>
                  </div>

                  <div className="absolute bottom-0 right-0 p-6 opacity-10 group-hover:opacity-40 transition-opacity">
                    <div className="w-12 h-12 border-r-2 border-b-2 border-emerald-500 rounded-br-3xl"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
