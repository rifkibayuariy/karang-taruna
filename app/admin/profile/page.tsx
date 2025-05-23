import Breadcrumb from "@/components/admin/breadcrumb";

export default function Profile() {
    return (
    <main className="md:pt-8 pb-12 min-h-screen">
        <div className="w-full">
        <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold">Settings</h1>
        <div className="pb-6 md:pt-3">
            <Breadcrumb/>
        </div>

        <div className="bg-white shadow rounded-xl p-8 max-w-full">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">General Information</h2>

          {/* Foto Profil */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <img
                    src="/images/profile.png"
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-gray-900 text-lg">Rifky Bayu Arianto</p>
                    <p className="text-sm text-gray-500 mb-3">Sekretaris</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="px-4 py-2 bg-black text-white font-semibold rounded-xl text-sm hover:bg-gray-900 transition">
                            Upload New Photo
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-100 transition">
                            Delete
                        </button>
                    </div>
                </div>
            </div>

          {/* Formulir */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
            {/* Nama Organisasi */}
            <div>
                <label className="block font-medium mb-2" htmlFor="organization-name">Nama Organisasi</label>
                <input
                id="organization-name"
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            {/* Email */}
            <div>
                <label className="block font-medium mb-2" htmlFor="email">Alamat Email</label>
                <input
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            {/* Nomor HP */}
            <div>
                <label className="block font-medium mb-2" htmlFor="phone-number">Nomor HP</label>
                <input
                id="phone-number"
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            {/* Fax */}
            <div>
                <label className="block font-medium mb-2" htmlFor="fax">Fax</label>
                <input
                id="fax"
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            {/* Negara */}
            <div>
                <label className="block font-medium mb-2" htmlFor="country">Negara</label>
                <select
                id="country"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="Indonesia"
                >
                <option>Indonesia</option>
                <option>Bali</option>
                <option>Jawa</option>
                <option>Lampung</option>
                </select>
            </div>
            {/* Kota */}
            <div>
                <label className="block font-medium mb-2" htmlFor="city">Kota</label>
                <input
                id="city"
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            {/* Kode Pos */}
            <div>
                <label className="block font-medium mb-2" htmlFor="postal-code">Kode Pos</label>
                <input
                id="postal-code"
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            {/* Provinsi */}
            <div>
                <label className="block font-medium mb-2" htmlFor="province">Provinsi</label>
                <input
                id="province"
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            </form>

          {/* Tombol */}
            <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-4">
                <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                    Cancel
                </button>
                <button className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition">
                    Save Changes
                </button>
            </div>
        </div>
        </div>
    </main>
    );
}
