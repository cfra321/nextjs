'use client'

const HomeFooter = () => {
    return (
        <footer className="footer bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 text-right bottom-0 w-full mt-8">
            <div>
                <h1 className="mb-4">Footer</h1>
                <p className="m-0"> &copy; {new Date().getFullYear()} kukuh wicaksono</p>
            </div>
        </footer>
    )
}

export default HomeFooter