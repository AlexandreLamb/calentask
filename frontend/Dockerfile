FROM node:14.18.3-buster-slim

# Expose ports
EXPOSE 3000
EXPOSE 35729

# Set working directory
WORKDIR /frontend

# Add /app/node_modules/.bin to environment variables
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files and install app dependencies
COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json
RUN npm install
RUN npm install react-scripts -g

# Add React app to working directory
ADD . /frontend

# Start the React app
CMD ["npm","start"]