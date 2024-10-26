/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "techarc.pk",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
