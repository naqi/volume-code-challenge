/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites(){
        return [
            {
                source: '/calculate',
                destination: '/api/calculate',
            }
        ]
    }
};

export default nextConfig;
