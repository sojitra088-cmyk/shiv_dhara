import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data);
    } catch (err) {
      console.error("Supabase error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const printPage = () => {
    window.print();
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold">Contact Messages</h1>

        <button
          onClick={printPage}
          className="bg-lime-500 text-black px-6 py-2 rounded-full font-semibold"
        >
          Print
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* PRINTABLE AREA */}
          <div
            id="print-area"
            className="overflow-x-auto bg-white shadow rounded-xl"
          >
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Message</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.full_name}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.phone || "-"}</td>
                    <td className="p-3 capitalize">{item.subject}</td>
                    <td className="p-3">{item.message}</td>
                    <td className="p-3 text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContacts;
