import Link from "next/link"

function Footer(){
  
    return (
        <footer className="text-center text-neutral-900 mx-auto justify-center bottom-0 pb-10">
        <div className="flex justify-center gap-4">
          <Link href="/blog/about" className="hover:text-amber-200 transition duration-300 ease-in-out">
            About Us
          </Link>
          <Link href="/blog/admin-login?" className="hover:text-amber-200 transition duration-300 ease-in-out">
            Admin
          </Link>
        </div>

        <div className="mt-4 text-sm">© 2023 CerpenBlog. All rights reserved.</div>
      </footer>
    )
}

export default Footer