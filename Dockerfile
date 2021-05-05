FROM node:10.15.3

LABEL AUTHOR="Thomas DSilva (thomas.dsilva.contractor@macmillan.com)"
COPY ./ ./
RUN mkdir /downloads
RUN npm install
#EXPOSE 3000

#CMD ["npm", "run", "test"]