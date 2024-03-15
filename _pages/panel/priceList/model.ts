export const stylePrint = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

a {
  text-decoration: none;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.q-px-xs {
    padding-left: 4px;
    padding-right: 4px;
}

.col-12 {
  height: auto;
  width: 100%;
}

.col-md-4 {
  height: auto;
  width: 33.3333%;
}

.col-md-6 {
  height: auto;
  width: 50%;
}

* {
  padding: 0;
  margin: 0;
  border: none;
  box-sizing: border-box;
}

.no-print,
.q-focus-helper {
  display: none;
}

.text-center {
  text-align: center;
}

.q-mt-md {
  margin-top: 10px;
}

.q-mt-xs {
  margin-top: 12px;
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
  font-size: 0.6rem;
}

.text-caption {
  font-size: 0.5rem;
}

.title {
  background-color: var(--q-primary);
}

.title a {
  color: white;
  font-size: 0.7rem;
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
  color: var(--q-primary);
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

.q-item__section--main {
  width: auto;
  min-width: 0;
  max-width: 100%;
  flex: 10000 1 0%;
}

.q-item__section--main ~ .q-item__section--side {
  align-items: flex-end;
  padding-right: 0;
  padding-left: 16px;
}

.q-item__label {
  line-height: 1.2em !important;
  max-width: 100%;
}

.custom-logo {
  padding-bottom: 25px;
  padding-top: 25px;
}

.custom-border {
    border-bottom: 1px solid #607d8b;
}
@media print {
  body {-webkit-print-color-adjust: exact;}
}`;
