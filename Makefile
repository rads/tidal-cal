OUT := public/index.js

all: $(OUT) agenda.db

$(OUT): client
	./node_modules/.bin/browserify client/index.js > $@

agenda.db:
	cp -r agenda.db.default agenda.db

clean:
	rm $(OUT)

