import "./Sidebar.css";

function Sidebar({ open, onClose }) {

    return (

        <>

            {open && (
                <div
                    className="overlay"
                    onClick={onClose}
                />
            )}

            <aside className={`sidebar ${open ? "active" : ""}`}>

                <h2>Filter Produk</h2>

                <div className="filter-group">

                    <h4>Kategori</h4>

                    <label>
                        <input type="checkbox"/>
                        Skincare
                    </label>

                    <label>
                        <input type="checkbox"/>
                        Makeup
                    </label>

                    <label>
                        <input type="checkbox"/>
                        Body Care
                    </label>

                </div>

                <div className="filter-group">

                    <h4>Harga</h4>

                    <label>
                        <input type="radio" name="price"/>
                        Dibawah Rp50.000
                    </label>

                    <label>
                        <input type="radio" name="price"/>
                        Rp50.000 - Rp100.000
                    </label>

                    <label>
                        <input type="radio" name="price"/>
                        Diatas Rp100.000
                    </label>

                </div>

            </aside>

        </>

    );

}

export default Sidebar;