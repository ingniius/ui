changeset.add:
	@pnpm changeset add
changeset.version:
	@pnpm changeset version
changeset.publish:
	@pnpm changeset publish

composer.run:
	@composer run $(filter-out $@,$(MAKECMDGOALS))
composer.lint:
	@composer run lint
composer.test:
	@composer run test
composer.dry:
	@rm -rf .phpunit.cache vendor

turbo.run:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS))
turbo.lint:
	@pnpm prettier ./turbo/** --write --cache --cache-location=.turbo/.prettiercache
turbo.gen:
	@pnpm turbo gen $(filter-out $@,$(MAKECMDGOALS))
turbo.dry:
	@pnpm turbo clean && rm -rf .turbo node_modules

%:
	@:
