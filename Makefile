composer.run:
	@composer run $(filter-out $@,$(MAKECMDGOALS))
composer.dry:
	@rm -rf .phpunit.cache vendor

turbo.run:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS))
turbo.dry:
	@pnpm clean && rm -rf .turbo node_modules

%:
	@:
