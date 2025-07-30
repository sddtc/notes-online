import React from "react"

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <p>Made by <a href="https://www.sddtc.florist">sddtc</a> ⓒ {year}</p>
    </footer>
  )
}

export default Footer