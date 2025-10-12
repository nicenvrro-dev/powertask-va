import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, X } from "lucide-react";

interface UserData {
  id: string;
  name: string;
}

interface EmployeeAutocompleteProps {
  onSelect: (user: UserData) => void;
  selectedUser: UserData | null;
  onClear: () => void;
}

const USERS: UserData[] = [
  { id: "1", name: "Harvey" },
  { id: "2", name: "Test" },
  { id: "3", name: "John Doe" },
  { id: "4", name: "Jane Smith" },
  { id: "5", name: "Michael Johnson" },
  { id: "6", name: "Sarah Williams" },
  { id: "7", name: "David Brown" },
  { id: "8", name: "Emily Davis" },
  { id: "9", name: "Robert Wilson" },
  { id: "10", name: "Lisa Anderson" },
  { id: "11", name: "James Taylor" },
  { id: "12", name: "Jennifer Martinez" },
];

export default function EmployeeAutocomplete({
  onSelect,
  selectedUser,
  onClear,
}: EmployeeAutocompleteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 1) {
      setFilteredUsers([]);
      setIsOpen(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const matches = USERS.filter((user) => user.name.toLowerCase().includes(query));

    setFilteredUsers(matches);
    setIsOpen(matches.length > 0);
  }, [searchQuery]);

  const handleSelect = (user: UserData) => {
    onSelect(user);
    setSearchQuery("");
    setIsOpen(false);
    setFilteredUsers([]);
  };

  const handleClear = () => {
    onClear();
    setSearchQuery("");
    setFilteredUsers([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      {selectedUser ? (
        <div className="w-full px-4 py-3 border-2 border-green-400 bg-green-50 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                {selectedUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-semibold text-gray-800">{selectedUser.name}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length > 0 && filteredUsers.length > 0 && setIsOpen(true)}
            placeholder="Start typing employee name..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            autoComplete="off"
          />
        </div>
      )}

      <AnimatePresence>
        {isOpen && filteredUsers.length > 0 && !selectedUser && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-80 overflow-y-auto"
          >
            <div className="py-2">
              {filteredUsers.map((user, index) => (
                <motion.button
                  key={user.id}
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleSelect(user)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 truncate">{user.name}</div>
                  </div>
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {searchQuery.length > 0 && filteredUsers.length === 0 && !selectedUser && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="px-4 py-6 text-center text-gray-500">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm">No employees found matching "{searchQuery}"</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
