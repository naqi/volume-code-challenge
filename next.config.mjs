/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites(){
        return [
            {
                source: '/calculator',
                destination: '/api/calculator',
            }
        ]
    }
};

export default nextConfig;
