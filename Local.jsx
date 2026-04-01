
import React, { useState, useEffect } from "react";

export default function ProductPage() {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: ""
  });

  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const oldData = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(oldData);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let updated;

    if (editIndex !== null) {
      updated = [...products];
      updated[editIndex] = product;
      setEditIndex(null);
    } else {
      updated = [...products, product];
    }

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    setProduct({
      name: "",
      price: "",
      image: "",
      category: ""
    });
  }

  function Delete(i) {
    let data = products.filter((_, index) => index !== i);
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  }

  function Edit(i) {
    setProduct(products[i]);
    setEditIndex(i);
  }

  return (
    <div className="container py-5">

      <div className="card border-0 shadow-lg rounded-4 p-4 mb-5">
        <h2 className="text-center fw-bold text-primary mb-4">
           Product Manager
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="form-control form-control-lg rounded-3"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="number"
                name="price"
                placeholder="Price ₹"
                className="form-control form-control-lg rounded-3"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="form-control form-control-lg rounded-3"
                value={product.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="form-control form-control-lg rounded-3"
                value={product.category}
                onChange={handleChange}
              />
            </div>

          </div>

          <button className="btn btn-primary w-100 py-2 fw-bold rounded-3">
            {editIndex !== null ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

   
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

        <input
          type="text"
          placeholder=" Search product..."
          className="form-control w-50 rounded-3 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select w-25 rounded-3 shadow-sm"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low"> Price Low → High</option>
          <option value="high"> Price High → Low</option>
        </select>

      </div>

   
      <div className="row">

        {products
          .filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => {
            if (sort === "low") return a.price - b.price;
            if (sort === "high") return b.price - a.price;
            return 0;
          })
          .map((item, i) => (

            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={i}>
              <div className="card border-0 shadow-lg rounded-4 h-100">

                <div className="p-3 text-center">
                  <img
                    src={item.image}
                    alt=""
                    className="img-fluid rounded-3"
                    style={{ height: "160px", objectFit: "contain" }}
                  />
                </div>

                <div className="card-body text-center">

                  <h5 className="fw-bold">{item.name}</h5>

                  <p className="text-success fw-semibold mb-1">
                    ₹ {item.price}
                  </p>

                  <span className="badge bg-secondary mb-3">
                    {item.category}
                  </span>

                  <div className="d-flex justify-content-center gap-2">

                    <button
                      className="btn btn-outline-success btn-sm px-3"
                      onClick={() => Edit(i)}
                    >
                       Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm px-3"
                      onClick={() => Delete(i)}
                    >
                       Delete
                    </button>

                  </div>

                </div>

              </div>
            </div>

          ))}

      </div>

    </div>
  );
}