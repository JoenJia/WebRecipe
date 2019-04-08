using RecipeService.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit;
using NUnit.Framework;
using NUnit.Compatibility;
using Moq.Internals;
using RecipeServiceDomain.Repositories;
using RecipeServiceDomain.Contexts.Models;
using RecipeServiceDomain.Contexts;
using Moq;

namespace RecipeService.Controllers.Tests
{
    [TestFixture()]
    public class RecipesControllerTests : RecipeServiceTests.UnitTestBase
    {
        Mock<IContextRepositories> ctxMock;
        //Mock<IRecipeRepository> rcpMock;
        Recipe r1;
        Recipe r2;
        List<Recipe> rs = new List<Recipe>();
        [SetUp]
        public void SetUp()
        {
            ctxMock = MockRepository.Create<IContextRepositories>();
            //rcpMock = MockRepository.Create<IRecipeRepository>();
            //dbMock = MockRepository.Create<IModelRecipe>();

            r1 = new Recipe()
            {
                recipe_id = 101,
                recipe_description = "test recipe 1 desc",
                recipe_title = "test recipe 1 title"
            };
            r2 = new Recipe()
            {
                recipe_id = 102,
                recipe_description = "test recipe 2 desc",
                recipe_title = "test recipe 2 title"
            };
            rs.Add(r1);
            rs.Add(r2);
            //ctxMock.SetupGet<IRecipeRepository>(x => x.RecipeRepository).Returns(rcpMock.Object);
            //rcpMock.Setup<IEnumerable<Recipe>>(x => x.GetAll()).Returns(new List<Recipe> { r1, r2 });

        }
        [Test]
        public void GetAllTest()
        {
            ctxMock.Setup<IEnumerable<Recipe>>(x => x.RecipeRepository.GetAll()).Returns(rs);
            RecipesController controller = new RecipesController(ctxMock.Object);
            var rcpAll = controller.Get();
            Assert.IsNotNull(rcpAll);
            Assert.IsTrue(rcpAll.Count() == 2);
            Assert.AreEqual(rcpAll.First().recipe_id, 101);
            Assert.AreEqual(rcpAll.Skip(1).First().recipe_id, 102);
            ctxMock.Verify(x => x.RecipeRepository.GetAll(), Times.Once);
        }
        [TestCase(101)]
        [TestCase(102)]
        public void GetTest(int id)
        {
            ctxMock.Setup<Recipe>(x => x.RecipeRepository.Find(id)).Returns(rs.Where(x => x.recipe_id == id).FirstOrDefault());
            RecipesController controller = new RecipesController(ctxMock.Object);
            var rcp = controller.Get(id);
            Assert.IsNotNull(rcp);
            Assert.AreEqual(rcp.recipe_id, id);
            ctxMock.Verify(x => x.RecipeRepository.Find(id), Times.Once);
        }
        [Test]
        public void PostTest()
        {
            ctxMock.Setup(x => x.RecipeRepository.Create(It.IsAny<Recipe>())).Verifiable();
            Recipe r = new Recipe()
            {
                recipe_id = 201,
                recipe_description = "created recipe 1 desc",
                recipe_title = "created recipe 1 title"
            };
            RecipesController controller = new RecipesController(ctxMock.Object);
            controller.Post(r);
            ctxMock.Verify(x => x.RecipeRepository.Create(r), Times.Once);
        }
    }
}