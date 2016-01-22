# A good example of what you don't want to do with mongoose.

I created mongoose models from instances of ES6 classes. This did not serve me well when I wanted to edit documents because the models were not consistent. Next time, I'll either use imported models without classes, or a raw mongodb driver. Alternatively, I could keep various models in separate collections to make querying and updating with models useful and effective with data validation.

Throughout the code, I sprinkled in varous ES6 features for practice (though it may not make sense, like with the classes).

