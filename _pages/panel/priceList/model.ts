export const stylePrint = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

a {
  text-decoration: none;
}

* {
  padding: 0;
  margin: 0;
  border: none;
}

.no-print,
.q-focus-helper {
  display: none;
}

.text-center {
  text-align: center;
}

.q-avatar {
  border-top: 1px solid;
  font-size: 150px;
}

.price-list {
  column-count: 3;
  column-gap: 6px;
}

.q-mt-md {
  margin-top: 10px;
}

.q-mt-xs {
  margin-top: 12px;
}

.text-body1 {
  font-size: 1rem;
}

.text-primary {
  color: var(--q-color-primary);
}

.price-list__content {
  width: 100%;
  display: grid;
  box-sizing: border-box;
}

.q-item {
  color: black;
  display: flex;
  padding: 4px;
  justify-content: space-between;
}

.text-blue-grey {
  color: #607d8b;
}

.text-body2 {
  font-size: 0.8rem;
}

.text-caption {
  font-size: 0.7rem;
}

.title {
  margin: 8px 0;
}

.footer-print {
  border-top: 1px solid #607d8b;
  padding-top: 15px; 
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.footer-print .q-mr-md {
  position: relative;
  margin-right: 15px;
}

.footer-print p {
  color: var(--q-color-primary);
  margin-bottom: 10px;
}

.footer-print ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.footer-print ul li {
  text-align: start;
  margin-bottom: 5px;
}

.footer-print ul li:last-child {
  margin-bottom: 0;
}

.footer-print .q-mr-md:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 0;
  right: -5px;
  height: 100%;
  width: 1px;
  border-right: 1px solid #607d8b;
}

.custom-border {
    border-bottom: 1px solid #607d8b;
}`