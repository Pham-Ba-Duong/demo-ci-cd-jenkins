# Sử dụng Node.js 18 (nhẹ, ổn định)
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file package và cài dependencies
COPY package*.json ./
RUN npm install --production

# Copy toàn bộ mã nguồn
COPY . .

# Container sẽ lắng nghe port 3000
EXPOSE 3000

# Lệnh chạy app
CMD ["node", "index.js"]
