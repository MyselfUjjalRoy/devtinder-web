import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length == 0) return <h1>NO CONNECTIONS FOUND</h1>;

  return (
    <div
      className="min-h-screen py-20 px-4"
      style={{
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,0.15) 0, transparent 50%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-24 flex flex-col items-center">
          <h1 className="text-8xl font-black tracking-tighter text-white opacity-90 mix-blend-difference">
            Connections
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {connections.map((connection) => {
            const { firstName, lastName, photoUrl, age, gender, about } =
              connection;
            return (
              <div key={connection._id} className="group relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent rounded-[4rem] blur-3xl group-hover:from-indigo-500/20 transition-all duration-700"></div>

                <div className="relative flex flex-col bg-white/[0.02] border border-white/[0.05] rounded-[3rem] p-10 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10 shadow-2xl overflow-hidden">
                  <div className="flex justify-between items-start mb-10">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img
                        src={photoUrl}
                        className="relative w-32 h-32 rounded-[2.5rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110"
                        alt="profile"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-white/10 font-mono italic group-hover:text-indigo-500/20 transition-colors">
                        #{age}
                      </p>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
                        {gender}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white leading-none tracking-tight">
                      {firstName} <br />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        {lastName}
                      </span>
                    </h2>

                    <div className="h-[1px] w-12 bg-indigo-500 group-hover:w-full transition-all duration-700"></div>

                    <p className="text-slate-400 text-sm leading-relaxed font-light line-clamp-3">
                      {about}
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 border-r-2 border-b-2 border-indigo-500 rounded-br-3xl"></div>
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

export default Connections;
