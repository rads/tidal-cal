OUT := public/index.js

$(OUT): client
	./node_modules/.bin/browserify client/index.js > $@

clean:
	rm $(OUT)
